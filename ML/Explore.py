
# coding: utf-8

# In[77]:


# import libraries
import math
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import tensorflow as tf
import sklearn
from sklearn import metrics
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from IPython import display
import matplotlib
matplotlib.use('TkAgg')
from matplotlib import cm
from matplotlib import gridspec
from matplotlib import pyplot as plt
from flask import Flask
from flask import request

# Get data
diabetes = pd.read_csv("http://storage.googleapis.com/optum-datasets-11/diabetes.csv")
diabetes = diabetes.reindex(
    np.random.permutation(diabetes.index)
)

COLS = ['Pregnancies', 'Glucose', 'BMI', 'Age']

# split data
n = len(diabetes.index)
#train = diabetes.head(math.floor(0.8*n))
train = diabetes
test = diabetes.tail(math.floor(0.2*n))


# # Essential Functions

# ### Input Functions

# In[78]:


def eval_input_fn(features, labels=None, batch_size=1):
    """An input function for prediction"""
    features= dict(features)
    if labels is None:
        # No labels, use only features.
        inputs = features
    else:
        inputs = (features, labels)
    # convert inputs to DataSet
    dataset = tf.data.Dataset.from_tensor_slices(inputs)
    # shuffle, repeat, and batch examples
    return dataset.repeat(1).batch(batch_size)

def my_input_fn(features, targets=None, batch_size=1, shuffle=True, num_epochs=None):
    """Trains a neural network model.
  
    Args:
      features: pandas DataFrame of features
      targets: pandas DataFrame of targets
      batch_size: Size of batches to be passed to the model
      shuffle: True or False. Whether to shuffle the data.
      num_epochs: Number of epochs for which data should be repeated. None = repeat indefinitely
    Returns:
      Tuple of (features, labels) for next data batch
    """
    
    # Convert pandas data into a dict of np arrays.
    features = dict(features)
    if targets is None:
        inputs = features
    else:
        inputs = (features, targets)

    # Construct a dataset, and configure batching/repeating.
    ds = tf.data.Dataset.from_tensor_slices(inputs) # warning: 2GB limit
    ds = ds.batch(batch_size).repeat(num_epochs)
    
    # Shuffle the data, if specified.
    if shuffle:
        ds = ds.shuffle(10000)
    
    # Return the next batch of data.
    features, labels = ds.make_one_shot_iterator().get_next()
    return features, labels


# ### Features

# In[79]:


def process_features(df):
    def linear_scale(series):
        min_val = series.min()
        max_val = series.max()
        scale = (max_val - min_val) / 2.0
        return series.apply(lambda x:((x - min_val) / scale) - 1.0)
    
    x = pd.DataFrame(df, columns=COLS)
    return x

def process_targets(df):
    return pd.DataFrame(df, columns=['Outcome'])

def construct_feature_columns(input_features):
    return set([tf.feature_column.numeric_column(my_feature) for my_feature in input_features])


# In[80]:


train_x = process_features(train)
train_y = process_targets(train)
test_x = process_features(test)
test_y = process_features(test)


# ### Instantiate Estimator

# In[81]:


def train_dnn_classifier(
    steps,
    batch_size,
    hidden_units,
    train_x,
    train_y,
    validate_x=None,
    validate_y=None,
    validate=False,
    dropout=0):
    '''Trains neural network regression model'''
    
    periods = 10
    steps_per_period = steps / periods
    
    # Create DNN classifier object
    #my_optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.001)
    my_optimizer = tf.train.AdamOptimizer(learning_rate=0.00012)
    my_optimizer = tf.contrib.estimator.clip_gradients_by_norm(my_optimizer, 5.0)
    classifier = tf.estimator.DNNClassifier(
        feature_columns = construct_feature_columns(train_x),
        hidden_units = hidden_units,
        optimizer = my_optimizer,
        dropout = dropout
    )
    
    # Create input functions
    train_input_fn = lambda: my_input_fn(train_x, train_y, batch_size)
    predict_train_input_fn = lambda: my_input_fn(train_x, train_y, num_epochs=1, shuffle=False)
    predict_validate_input_fn = lambda: my_input_fn(validate_x, validate_y, num_epochs=1, shuffle=False)
    
    # Train model in loop to periodically assess
    print("Training model...")
    print("LogLoss error (on train/validation data):")
    training_log_losses = []
    validation_log_losses = []
    for period in range (0, periods):
        # Train the model, starting from the prior state.
        classifier.train(
            input_fn=train_input_fn,
            steps=steps_per_period
        )

        # Take a break and compute probabilities.
        training_probabilities = classifier.predict(input_fn=predict_train_input_fn)
        training_probabilities = np.array([item['probabilities'] for item in training_probabilities])
        training_log_loss = metrics.log_loss(train_y, training_probabilities)
        training_log_losses.append(training_log_loss)
        print("  train period %02d : %0.3f" % (period, training_log_loss))
        
        if validate:
            validation_probabilities = classifier.predict(input_fn=predict_validate_input_fn)
            validation_probabilities = np.array([item['probabilities'] for item in validation_probabilities])
            validation_log_loss = metrics.log_loss(validate_y, validation_probabilities)
            validation_log_losses.append(validation_log_loss)
            print("  validation period %02d : %0.3f" % (period, validation_log_loss))
    print("Model training finished.")
    
    # Output a graph of loss metrics over periods.
    plt.ylabel("LogLoss")
    plt.xlabel("Periods")
    plt.title("LogLoss vs. Periods")
    plt.tight_layout()
    plt.plot(training_log_losses, label="training")
    plt.plot(validation_log_losses, label="validation")
    plt.legend()

    return classifier


# ### Make classifier

# In[82]:


classifier = train_dnn_classifier(
        steps=1800,
        batch_size=50,
        hidden_units=[100, 75, 50, 25],
        train_x=train_x,
        train_y=train_y,
        validate_x=test_x,
        validate_y=test_y,
        validate=False,
        dropout=0)


# In[83]:


# evaluate model
train_eval_metrics = classifier.evaluate(input_fn = lambda: my_input_fn(train_x, train_y, num_epochs=1, shuffle=False))
# validate_eval_metrics = classifier.evaluate(input_fn = lambda: my_input_fn(test_x, test_y, num_epochs=1, shuffle=False))
print("AUC on the training set: %0.5f" % train_eval_metrics['auc'])
print("Accuracy on the training set: %0.5f" % train_eval_metrics['accuracy'])
# print("AUC on the validation set: %0.2f" % validate_eval_metrics['auc'])
# print("Accuracy on the validation set: %0.2f" % validate_eval_metrics['accuracy'])


# ### Export Model

# In[92]:


export_dir_base = './export'
default_batch_size = 1

feature_spec = {
    'Glucose': tf.FixedLenFeature(shape=[], dtype=tf.int64),
    }

def serving_input_receiver_fn():
    """An input receiver that expects a serialized tf.Example."""
    serialized_tf_example = tf.placeholder(dtype=tf.string,
                                         shape=[default_batch_size],
                                         name='classifier_predictions')
    receiver_tensors = {'examples': serialized_tf_example}
    features = tf.parse_example(serialized_tf_example, feature_spec)
    return tf.estimator.export.ServingInputReceiver(features, receiver_tensors)

#classifier.export_savedmodel(export_dir_base, serving_input_receiver_fn,
#                            strip_default_attrs=True)


# tensorflowjs_converter \
#     --input_format=tf_saved_model \
#     --output_node_names='classifier_predictions' \
#     --saved_model_tags=serve \
#     ./export/1530217058 \
#     ./export/web_model

app = Flask(__name__)
@app.route('/api/', methods=['GET'])
def hello():
    predict_x = {}
    for col in COLS:
        val = request.args.get(col)
        if val:
            predict_x[col] = [int(val)]
        else:
            predict_x[col] = [0]

    expected = [1]
    predictions = classifier.predict(
        input_fn=lambda:eval_input_fn(predict_x)
    )
    for pred, expec in zip(predictions, expected):
        #class_id = pred['class_ids'][0]
        prediction = pred['probabilities'][1]
    print(str(prediction))
    return(str(prediction))
app.run()
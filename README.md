# Bluemix_RR_Nodejs
Bluemix API of retrieve and rank in Node.js

[![Node.js 4.4.5](https://img.shields.io/badge/Node.js-4.4.5-orange.svg)](https://nodejs.org/en/)
[![Platforms OS X | Windows | Linux |](https://img.shields.io/badge/Platforms-OS%20X%20%7C%20Windows%20%7C%20Linux%20-lightgray.svg)](https://nodejs.org/en/)

# What is this repository for? ###

* Quick summary: Use retrieve and rank API on Bluemix by Node.js
* Note: This is for Chinese version of RR, `Solr_Japanese_Chi_20160509` and `train_with_encoded_ja` are specific for this purpose.
* Version 1.1.0

# Preparation ###

1. Apply a Bluemix account.
2. Be familiar with Nodejs fundamentation.

# Stage One - Set up service ###

1. Log in at [Bluemix](http://ng.bluemix.net) website.
2. Go to catalog and find the NLC service.
![Catalog](/screenshots/Catalog.png)
3. Type a unique name for the service instance in the Service name field. Leave the default values for the other options.
4. In your Service Credentials, bear in mind your *username* and *password*. 
![Catalog](/screenshots/Credentials.png)

# Stage Two - Create, train and rank a classifier ###

1. Go to Nodejs SDK from [Github](https://github.com/watson-developer-cloud/node-sdk) page which is developed by IBM.
2. Open get started [page[(https://www.ibm.com/watson/developercloud/doc/retrieve-rank/index.shtml) to download some resources.
3. Install node-nodule:`$ npm install watson-developer-cloud --save`

* Credential:
```javascript
var retrieve_and_rank = watson.retrieve_and_rank({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});
```
* Create a cluster first.
```javascript
function createCluster() {
  retrieve_and_rank.createCluster({
    cluster_size: '1',
    cluster_name: 'API_version'
  },
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}
```
* Upload configuration file
```javascript
function uploadConfig() {

  var params = {
    cluster_id: cluster_id,
    config_name: config_name,
    config_zip_path: 'Solr_Japanese_Chi_20160509.zip'
  };

  retrieve_and_rank.uploadConfig(params,
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}
```
* Create a collection
```javascript
function createCollection(name) {
  var params = {
    cluster_id: cluster_id,
    config_name: config_name,
    collection_name: name,
    wt: 'json'
  };

  retrieve_and_rank.createCollection(params,
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}
```
* Upload documents. 
```javascript
function uploadDoc(path) {

  var file = path;
  var doc = jsonfile.readFileSync(file);

  solrClient = retrieve_and_rank.createSolrClient({
  cluster_id: cluster_id,
  collection_name: collection_name,
});

  console.log('Indexing a document...');
  solrClient.add(doc, function (err, response) {
    if (err) {
      console.log('Error indexing document: ', err);
    }
      else {
        console.log('Indexed a document.');
        solrClient.commit(function(err) {
          if(err) {
            console.log('Error committing change: ' + err);
          }
            else {
              console.log('Successfully committed changes.');
            }
        });
      }
  });
}
```
* Create and train the ranker. Please **DON’T** use node,js or Curl this step. Just use Python file to process. 
```
$ python ./train_with_encoded_ja.py -u "<username>":"<password>"
```
* Search and Rank
```javascript
function searching(input) {
  
  solrClient = retrieve_and_rank.createSolrClient({
  cluster_id: cluster_id,
  collection_name: collection_name,
  wt: 'json'
});

  var ranker_id = '';
  var question  = 'q=' + input;
  var query     = qs.stringify({q: question, ranker_id: ranker_id, fl: 'id,body'});

  solrClient.get('fcselect', query, function(err, searchResponse) {
    if(err) {
      console.log('Error searching for documents: ' + err);
    }
      else {
        var result = JSON.stringify(searchResponse.response.docs, null, 2);
        result = JSON.parse(result);
        if (result == '') {
          console.log('Not found');
        } else {
          console.log(result);
        }
        
      }
  });
}
```

# How do I get set up? ###

0. Read [IBM Watson Developer Cloud](https://www.ibm.com/watson/developercloud/doc/retrieve-rank/index.shtml) to know concept and flow. Sign up/in on [Bluemix](ng.bluemix.net) and crate a Retreive and Rank service with `usr/pwd`

1. Install nodejs on your computer: https://nodejs.org/en/

2. Oepn your Terminal/Command Line Tool.

3. go to Project Path: 
    `cd /path`

5. Install modeules: 
    `npm install` (if you encouter permission problems: sudo npm install)

6. Main functions are all implement in `Solrcluster.js` file.

    * Create Cluster.
    * Create collection.
    * Upload configuration.
    * Upload Documents.
    * Upload Training data and create Ranker.
    * Search and rerank.
    * Get information about configuration/cluster/rank.

7. Enjoy it (Ask something).

8. Remember Close the sever by Ctl+c

# How to run program ###
* Use CMD/Terminal
* Web browser

# Contribution guidelines ###
* [IBM Watson Developer Cloud](https://www.ibm.com/watson/developercloud/doc/retrieve-rank/index.shtml)
* Bo Cheng Huang

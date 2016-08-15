var watson = require('watson-developer-cloud');
var fs     = require('fs');
var qs = require('qs');
var jsonfile = require('jsonfile')
var retrieve_and_rank = watson.retrieve_and_rank({
  username: '',
  password: '',
  version: 'v1'
});

var cluster_id = '';
var config_name = '';
var collection_name = '';

// main 
// For upload traing data please use python
// ===========================

// createCollection(collection_name);
// uploadDoc('Documents.json');
// indexing();
// clusterInfo();
// listConfigs();
// listRankers();
// rankerInfo('');
// deleteRanker('');
searching('<Q>');

// ===========================

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

function listClusters() {
  retrieve_and_rank.listClusters({},
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}

function clusterInfo() {
  retrieve_and_rank.pollCluster({
    cluster_id: cluster_id
  },
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}

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

function listConfigs() {
  retrieve_and_rank.listConfigs({
    cluster_id: cluster_id
  },
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}

function deleteConfig() {
  retrieve_and_rank.deleteConfig({
    cluster_id: '',
    config_name: ''
  },
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}

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

function indexing() {
  var params = {
    cluster_id: cluster_id,
    collection_name: collection_name,
  };

  solrClient = retrieve_and_rank.createSolrClient(params);

  console.log('Searching all documents.');
  var query = solrClient.createQuery();
  query.q({ '*' : '*' });

  solrClient.search(query, function(err, searchResponse) {
    if(err) {
      console.log('Error searching for documents: ' + err);
    }
      else {
        console.log('Found ' + searchResponse.response.numFound + ' documents.');
        console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));
      }
  });
}

// Don't use this, please use train_with_encoded_ja.py
// function createRanker(path) {  
//   var params = {
//     training_data: fs.createReadStream(path)
//   };

//   retrieve_and_rank.createRanker(params,
//     function(err, response) {
//       if (err)
//         console.log('error: ', err);
//       else
//         console.log(JSON.stringify(response, null, 2));
//   });
// }


function listRankers() {
  retrieve_and_rank.listRankers({},
    function(err, response) {
      if (err)
        console.log('error: ', err);
      else
        console.log(JSON.stringify(response, null, 2));
  }); 
}

function deleteRanker(ranker_id) {
  retrieve_and_rank.deleteRanker({
    ranker_id: ranker_id,
  },
    function(err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}

function rankerInfo(ranker_id) {
  retrieve_and_rank.rankerStatus({
    ranker_id: ranker_id,
  },
    function(err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
}

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
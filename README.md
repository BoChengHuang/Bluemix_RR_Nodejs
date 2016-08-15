# Bluemix_RR_Nodejs
Bluemix API of retrieve and rank in Node.js

[![Node.js 4.4.5](https://img.shields.io/badge/Node.js-4.4.5-orange.svg)](https://nodejs.org/en/)
[![Platforms OS X | Windows | Linux |](https://img.shields.io/badge/Platforms-OS%20X%20%7C%20Windows%20%7C%20Linux%20-lightgray.svg)](https://nodejs.org/en/)

# What is this repository for? ###

* Quick summary: Use retrieve and rank API on Bluemix by Node.js
* Note: This is for Chinese version of RR, `Solr_Japanese_Chi_20160509` and `train_with_encoded_ja` are specific for this purpose.
* Version 1.1.0

# How do I get set up? ###

0. Read [IBM Watson Developer Cloud](https://www.ibm.com/watson/developercloud/doc/retrieve-rank/index.shtml) to know concept and flow.

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

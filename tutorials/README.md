# Sample Microservices App - Aura JS Credit Score

## Introduction

This is a tutorial for microservices training. In this tutorial, we will cover the following features:

* Service Mesh - Deploy a microservice with Istio enabled
* Canary deployment - Switch traffic from version V1 to version V2
* Service Brokers - Provision and use a MongoDB instance
* API-first development
* Observability - Observe the service runtime behaviour with Vizceral, Zipkin and Grafana (Limited)
* CI/CD - Use Wercker to deploy our services


## About the sample application
 
This is a simple node.js microservice application that takes a bunch of parameters, calculates and returns a credit score. The application has the following interfaces:

1. REST API POST "/api/creditscore" - This takes input parameters (JSON) and returns the generated credit score (JSON)
2. REST API GET "/api/creditscore" - This only returns a hardcoded message for now
3. Front end UI accesible at "/" - This shows a simple form (UI) to capture the input parameters and display the returned credit score

Note: In this tutorial, we will develop two versions of this service V1 and V2. 
* In version V1 we don't save any data
* In version V2 we use MongoDB to save/fetch data
 

## Tutorial Flow

In this tutorial, we will go through the following flow:

* [Part 1 - Deploy your first microservice](deploy_microservice.md)
  * Deploy microservice version V1 with Istio enabled (using Wercker)
  * Access GET "/api/creditscore" (in a Browser or in Postman)
  * Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

* [Part 2 - Canary deployment](canary_deploy.md)
  * Deploy microservice version V2 with Istio enabled (using Wercker)
  * Access GET "/api/creditscore" (in a Browser or in Postman)
  * See the traffic distribution between versions V1 and V2
  * Route 100% traffic to microservice version V2
  * Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

* [Part 3 - Service broker integration](service_broker.md)
  * Provision a MongoDb instance using Service Broker
  * Write code to connect microservice version V2 to the MongoDB instance
  * Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

* [Part 4 - API-first development exprience](api_first.md)
  * Associate API descriptor with the microservice (from the Admin console)
  * Generate Javascript lib (from the Admin console)
  * TBD - Create a new client microservice to use the generated JS library to access the backend rest API
  * TBD - Deploy this new client microservice with Istio enabled (using Wercker)
  * TBD - Access the new client microservice
  * TBD - Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)


## Prerequisites

- K8S config file
- Aura platform distribution
- Installer requirements (kubectl, helm)
- istioctl installed
- training-demo git repository cloned
- Developer tools (NPM, Docker)

## Cleanup - 

### Remove the aura-js-creditscore application from your K8s cluster

$ kubectl delete ing aura-js-creditscore  
ingress "aura-js-creditscore" deleted

$ kubectl delete deployment aura-js-creditscore-v1  
deployment "aura-js-creditscore-v1" deleted

$ kubectl delete service aura-js-creditscore  
service "aura-js-creditscore" deleted

### Remove the mongodb service broker manually (in case you delete it 

$ kubectl delete deployment mongodb-sb-inst-1-mongodb  
deployment "mongodb-sb-inst-1-mongodb" deleted

$ kubectl delete service mongodb-sb-inst-1-mongodb  
service "mongodb-sb-inst-1-mongodb" deleted``


# Sample Microservices App - Aura JS Credit Score

## Introduction

This is a tutorial for microservices training. In this tutorial, we will cover the following features:

* Service Mesh - Deploy a microservice with Istio enabled
* Canary deployment - Switch traffic from version V1 to version V2
* Service Brokers - Provision and use a MySQL instance
* API-first development
* Observability - Observe the service runtime behaviour with Vizceral, Zipkin and Grafana (Limited)
* CI/CD - Use Wercker to deploy our services


## About the sample application
 
This is a simple node.js microservice application that exposes a REST API.

REST API GET "/api/creditscore" - This only returns a hardcoded message for now. We will enhance this API in this tutorial

Note: In this tutorial, we will develop two versions of this service V1 and V2. 
* Version V1 is standalone app and doesn't use any DB
* In version V2 we will extend the app to connect to MySQL DB provisioned using Service Brokers 
 

## Prerequisites

- GitHub account
- Full access to CNP end-to-end (pipelines > releases > clusters)
- OCI LB quota. Should have room to create at least 1 LB for Istio ingress controller - this is a pre-requisite to install Aura which in turn installs Istio
- OKE 1.8.0 cluster with Aura platform pre-installed (if Aura is not pre-installed follow these [installation steps](https://confluence.oraclecorp.com/confluence/display/AURA/Installation+Steps+on+OKE+1.8.0))
- kubeconfig file of your OKE cluster downloaded on your machine
- kubectl installed and working on your machine 
- "kubectl proxy" runs and you can access the K8s dashboard
- Can view resources in your OCI tenancy (Ashburn region) from the OCI console
- Sufficient OCI block volume storage. At least 100 GB of block volume available to provision the service broker instance (uses 50 GB)
- (OPTIONAL) istioctl installed and working on your machine


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
  * Access GET "/api/creditscore" (in a Browser or in Postman)
  * Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

* [Part 4 - API-first development exprience](api_first.md)
  * Associate API descriptor with the microservice (from the Admin console)
  * Generate Javascript lib (from the Admin console)
  * TBD - Create a new client microservice to use the generated JS library to access the backend rest API
  * TBD - Deploy this new client microservice with Istio enabled (using Wercker)
  * TBD - Access the new client microservice
  * TBD - Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)


## Cleanup 

### Remove the aura-js-creditscore application from your K8s cluster

$ kubectl delete ing aura-js-creditscore  
ingress "aura-js-creditscore" deleted

$ kubectl delete deployment aura-js-creditscore-v1  
deployment "aura-js-creditscore-v1" deleted

$ kubectl delete service aura-js-creditscore  
service "aura-js-creditscore" deleted

### Remove the mongodb service broker manually (in case you delete aura before removing the services broker instance)

$ kubectl delete deployment mongodb-sb-inst-1-mongodb  
deployment "mongodb-sb-inst-1-mongodb" deleted

$ kubectl delete service mongodb-sb-inst-1-mongodb  
service "mongodb-sb-inst-1-mongodb" deleted

$ kubectl delete secret mongodb-sb-inst-1-mongodb secret-mongodb-sb-inst-1  
secret "mongodb-sb-inst-1-mongodb" deleted
secret "secret-mongodb-sb-inst-1" deleted  


### Delete PVC / PV / OCI BV

$ kubectl delete -f ../oke-pvc.yaml  
persistentvolumeclaim "mysql-pvc-01" deleted


### Alternate way to provision PVC / PV / OCI BV
Go to the <aura-installer-dir> and execute the following command  
$ ./bin/volumectl.sh --name mysql-pvc-01 --type pvc --oci-ad US-ASHBURN-AD-1 --create  
Creating PersistentVolumeClaim mysql-pvc-01 in OKE cluster ...

### Alternate way to delete PVC / PV / OCI BV
Go to the <aura-installer-dir> and execute the following command  
$ ./bin/volumectl.sh -n mysql-pvc-01 -t pvc -d  
Deleting PersistenceVolumeClaim mysql-pvc-01 in OKE cluster ...

Note:
The storage value in PVC yaml file should be between 50 GB and 16384 GB. Min. block storage = 50Gi

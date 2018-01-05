

# Sample Microservices App - Aura JS Credit Score

## Introduction

This is a tutorial for training of our microservices platform

## High level spec
 
This is a simple node.js microservices application that takes a bunch of parameters and returns a credit score. The application has the following interfaces:

1. REST API POST "/api/creditscore" - This takes input parameters (JSON) and returns the generated credit score (JSON)
2. REST API GET "/api/creditscore" - This only returns a hardcoded message for now
3. Front end UI accesible at "/" - This shows a simple form (UI) to capture the input parameters and to display the returned credit score

Note: In this tutorial, we will develop two versions of this service V1 and V2. 
* In version V1 we don't save any data
* In version V2 we use MongoDB to save/fetch data
 
The demo/lab we would run would basically accomplish the following

* Deploy service 1 to Aura with ISTIO enabled
* Deploy service 2 v1 to Aura with ISTIO enabled
* Associate API descriptor with Service 2 K8s service
* Generate Javascript lib
* Add Javascript lib to service 1
* Update deployment for service 1
* Deploy service 2 v2
* Route traffic to service 2
* Distribute traffic
* Create MySQL broker
* Write code to connect service 2 to MySQL instance
* Update service 2 v2 

# Step-by-Step guide of running the demo

## Prerequisites

- K8S config file
- Aura platform distribution
- Installer requirements (kubectl, helm)
- istioctl installed
- training-demo git repository cloned
- Developer tools (NPM, Docker)

**Cleanup - Remove the aura-js-creditscore application from your K8s cluster**

$ kubectl delete ing aura-js-creditscore  
ingress "aura-js-creditscore" deleted

$ kubectl delete deployment aura-js-creditscore-v1  
deployment "aura-js-creditscore-v1" deleted

$ kubectl delete service aura-js-creditscore  
service "aura-js-creditscore" deleted



$ kubectl delete deployment mongodb-sb-inst-1-mongodb  
deployment "mongodb-sb-inst-1-mongodb" deleted

$ kubectl delete service mongodb-sb-inst-1-mongodb  
service "mongodb-sb-inst-1-mongodb" deleted``





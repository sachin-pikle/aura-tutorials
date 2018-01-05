

# Sample Microservices App - Aura JS Credit Score

This is a simple microservices application that takes a bunch of parameters and returns a credit score. The application has the following interfaces:

1. Front end UI accesible at "/" - This shows a simple form (UI) to capture the input parameters and to display the returned credit score
2. REST API POST "/api/creditscore" - This takes input parameters (JSON) and returns the generated credit score (JSON)
3. REST API GET "/api/creditscore" - This only returns a hardcoded message for now

Note: In this tutorial, we will develop two versions of this service V1 and V2. In V1, we don't save any data. In V2 we will use MongoDB to save/fetch data.

V1 of the application

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





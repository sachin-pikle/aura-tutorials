

# angular-node creditscore sample app using aura microservices

**TODO - Explain the app and steps to run it**


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





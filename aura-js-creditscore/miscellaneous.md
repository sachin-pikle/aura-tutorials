# This is just a parking lot for things

## To remove the aura-js-creditscore application from your K8s cluster

$ kubectl delete ing aura-js-creditscore  
ingress "aura-js-creditscore" deleted

$ kubectl delete deployment aura-js-creditscore-v1  
deployment "aura-js-creditscore-v1" deleted

$ kubectl delete service aura-js-creditscore  
service "aura-js-creditscore" deleted

## To remove the mongodb service broker manually (in case you delete aura before removing the service broker instance)

$ kubectl delete deployment mongodb-sb-inst-1-mongodb  
deployment "mongodb-sb-inst-1-mongodb" deleted

$ kubectl delete service mongodb-sb-inst-1-mongodb  
service "mongodb-sb-inst-1-mongodb" deleted

$ kubectl delete secret mongodb-sb-inst-1-mongodb secret-mongodb-sb-inst-1  
secret "mongodb-sb-inst-1-mongodb" deleted
secret "secret-mongodb-sb-inst-1" deleted  


## To delete PVC / PV / OCI BV

$ kubectl delete -f mysql-pvc.yaml  
persistentvolumeclaim "mysql-pvc-01" deleted


## Alternate way to provision PVC / PV / OCI BV
Go to the <aura-installer-dir> and execute the following command  
$ ./bin/volumectl.sh --name mysql-pvc-01 --type pvc --oci-ad US-ASHBURN-AD-1 --create  
Creating PersistentVolumeClaim mysql-pvc-01 in OKE cluster ...

## Alternate way to delete PVC / PV / OCI BV
Go to the <aura-installer-dir> and execute the following command  
$ ./bin/volumectl.sh -n mysql-pvc-01 -t pvc -d  
Deleting PersistenceVolumeClaim mysql-pvc-01 in OKE cluster ...

## Note:
The storage value in PVC yaml file should be between 50 GB and 16384 GB. Min. block storage = 50Gi

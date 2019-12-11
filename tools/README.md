###Install
```
npm install -g yo@latest
npm i
npm link
```

###Login and Run and Clean up
```
oc login https://console.pathfinder.gov.bc.ca:8443 --token=RU4grkYyju_xTt78vROEGRNT6vkhps80qnx_o2RcSkY

yo dgrsc
yo dgrsc:init-env --prefix wfezkf
yo dgrsc:clean-env --destination wfezkf-dev
```

####Some other example calls
```
yo dgrsc:dgrsc-services-config --destination wfezkf-dev
yo dgrsc:delete-object --type configmap --name dgrsc-services-config --destination wfezkf-dev
```


###Uninstall/Unlink
```
npm ls --global generator-dgrsc
sudo npm rm --global generator-dgrsc
``

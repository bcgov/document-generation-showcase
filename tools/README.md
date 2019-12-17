###Install
```
npm install -g yo@latest
npm i
npm link
```

###Login and Run and Clean up
In your browser, log in to https://console.pathfinder.gov.bc.ca:8443/console.  
Click the drop down arrow for your account in the top right corner, and Copy Login Command.  
Paste the login into your shell or terminal and proceed with the generators.  

```
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

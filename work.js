/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

//'use strict';

 var flow_id;
var message_id;
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  var message = JSON.parse(event.data.text());
  message.options.actions=JSON.parse(message.options.actions);


  flow_id = message.flow_id;
  message_id =  message.message_id;
  const title = message.title;
  const options = message.options;
console.log('Pre Event, Flow ID: '+flow_id);
//const notificationPromise = self.registration.showNotification(title, options);
//event.waitUntil(notificationPromise);
event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.',event.notification);
 console.log('Action: '+event.action);
	console.log('Post Event, Flow ID: '+flow_id);
  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://pushtest.500apps.com/')
  );
});

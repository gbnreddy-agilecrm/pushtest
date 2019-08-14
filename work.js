

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

'use strict';
self.addEventListener('push', function(event) {
  
  console.log('[Service Worker] Push Received.');
 // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  // show this message in Notficatio window
  // location of the window
  // vibration of the window
  // title of the window
  // icon of the winow
  
  const title = 'PushTest.500apps.com';
  const options = {
    body: 'Hie this is the pushtest.500apps.com welcoming you !!',
    data: 'This is the meta information related to pushtest',
    icon: 'agilecrm.png',
    badge: 'agilecrm_2.jpg',
    image: 'agilecrm_1.png',
    dir: 'rtl',
    lang: 'en-US',
    tag:'geetha',
    vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
    timestamp: Date.parse(Date.now().toString())
    // actions: [
    //   {
    //     action: 'coffee-action',
    //     title: 'Coffee'
    //   },
    //   {
    //     action: 'doughnut-action',
    //     title: 'Doughnut'
    //   },
    //   {
    //     action: 'gramophone-action',
    //     title: 'gramophone'
    //   },
    //   {
    //     action: 'atom-action',
    //     title: 'Atom'
    //   }
    // ]

  };
//const notificationPromise = self.registration.showNotification(title, options);
//event.waitUntil(notificationPromise);
event.waitUntil(self.registration.showNotification(title, options));
});

  
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  console.log(event.notification);
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://pushtest.500apps.com/')
  );
});


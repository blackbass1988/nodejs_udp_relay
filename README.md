UDP relay
=============

What it do?
------------

- receive message from udp socket
- update mongo document
- send to memcache (if needed)

Requirements
-------------

- nodejs
- npm

Configure
------------

- config.json
- commandline

How to run?
-----------

- npm install
- node server.js (--mongo &lt;mongoconnect&gt; --memcache &lt;memcacheconnect&gt; --db &lt;db&gt; --collection &lt;collection&gt;)


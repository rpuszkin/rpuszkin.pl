[33mcommit 3b9acae7a57ce0a06e7f5acd3d8602831e8077df[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m)[m
Author: rpuszkin <130287042+rpuszkin@users.noreply.github.com>
Date:   Sun Apr 27 16:44:32 2025 +0200

    global varible startContentWatching changed to window.startContentWatching

[1mdiff --git a/scroll.js b/scroll.js[m
[1mindex f14719c..6f6c482 100644[m
[1m--- a/scroll.js[m
[1m+++ b/scroll.js[m
[36m@@ -47,7 +47,7 @@[m [mfunction scrollIt(targetId, duration) {[m
               resolve();[m
               hideLoader();[m
               if (scrollY > 0) {[m
[31m-                startContentWatching = Date.now();[m
[32m+[m[32m                window.startContentWatching = Date.now();[m
                 contentInVP = true;[m
               } else if (scrollY === 0) {[m
                 contentInVP = false;[m

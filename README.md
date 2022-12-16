# ChatRoom

A new sophisticated version of realtime chatroom app, with no DB and no authentication. All chats are happening on the client-side.

However, there is a tiny issue which is I couldn't handle error very well with react. That happens when checking for a user existing within a specific room. I try to return when that error happens but end up navigating to chat room all the same. My quick solution is redirecting user again to the Join form.

Another tiny issue, which I discovered lately, is when someone navigates back from /chat route to home / through history arrows on the browser, it doesn't disconnect from socket.

But the main issue is I couldn't reconnect the user again from the URL params when he/she refresh the page, and end up redirecting the user to the Join form.

If you know a better solution or wanna fix those issues, feel free to contact me.. I'll be grateful 💙 😊

<!-- [Start chatting]() -->

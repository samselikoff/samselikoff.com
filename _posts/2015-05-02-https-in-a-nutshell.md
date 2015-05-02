---
title: HTTPS in a nutshell
---

I knew very little about HTTPS, so I read [this article](http://www.objc.io/issue-10/ip-tcp-http.html). Here's my summary.

I'll assume that you're familiar with HTTP requests at a high level, but don't know much about the other Internet protocols, or what puts the S in HTTPS.

## What is HTTPS?

HTTPS is a *protocol*, which is a set of rules that governs data transfer. The various internet protocols are built on top of each other:

  - HTTPS (HTTP over TLS)
  - HTTP
  - TLS
  - TCP
  - IP

Each protocol exists to improve the layer beneath it in some way. Understanding each protocol is useful for understanding the benefits that HTTPS provides.

*IP* stands for Internet Protocol, and it is the primary mechanism for all data transfer on the Internet. IP transfers data in chunks called *packets* from a *source* to a *destination*. Somewhat surprisingly, it makes little guarantees about each packet it sends. In fact, when a source sends a packet, the destination could receive that packet once, twice (i.e. receive a duplicate), or not at all.

*TCP* stands for Transmission Control Protocol, and it's built on top of IP - you'll often see the pair referenced as TCP/IP. It was designed to be reliable: packets sent over TCP (between *hosts*) are guaranteed to be delivered once, and in order. But if TCP uses IP under the hood, how can it make these guarantees?

## How TCP works

First, in order for a TCP connection to be established, a *handshake* is required. To understand what a handshake is, consider an analogy. Let's say your phone rings, and you answer:

> "Hello?"

At this point, you don't know anything about the caller - it could be a person, it could be a machine, it could be no one. You're just attempting to make contact.

Say the caller responds:

> "Hi, this is Susan. How are you?"

Now we know that you've heard Susan's voice, and we know that Susan has heard your voice (since she acknowledged your greeting by responding in kind). However, *Susan* still doesn't know whether or not you've heard *her* voice. Once you respond

> "Fine, thanks"

we could say that a connection has been established: both parties have acknowledged communication with each other, and the conversation can proceed.

This is essentially what a TCP handshake is. One host - say, a *client* - sends a message with a random number to another host - a *server*. The server acknowledges receipt of the message by responding with the random number that was sent, incremented by 1. Additionally, it sends over a new random number of its own. Once the client responds back with *that* number incremented by 1, the connection is established. This is known as a *three-way handshake*: 

1. SYN
2. SYN-ACK
3. ACK

where **SYN** stands for *synchronize sequence numbers* (sending a message with a random number), and **ACK** stands for *acknowledgment*.

Once a connection is established, data transfer can begin. *Segments* of data are transferred from server to client, and each segment contains a reference to how many bytes have already been transferred. As the client receives more data, it acknowledges the total transferred amount with the appropriate ACK response. TCP's retry algorithms handle network issues such as congestion and dropped or duplicated packets, to ensure the data transfer happens smoothly.

In short, TCP is able to improve upon the unreliable IP layer by sending *acknowledged data* over an *established connection*.

## The web, security and TLS

*HTTP* stands for Hypertext Transfer Protocol, and it's built on top of TCP. Its transfer model is quite simple: a client makes a single request to a server, and the server sends back a single response. The web as we know it runs on HTTP: typing `www.facebook.com` into your address bar sends an HTTP request to Facebook's servers, and the web site you view and interact with is the server's response.

Because HTTP runs on top of TCP, new browser sessions must first establish a TCP connection before receiving any data. This involves the three-way handshake described in the previous section. Once the session is established, data transfer can begin between the client and server.

As the web integrates more and more with every aspect of our lives, a strong security model has become desirable. Using HTTP over a TCP connection is *insecure*, and it's easy to see why. Think back to the analogy of the phone call. After you had established contact with Susan, you both acknowledged that you were receiving each other's messages. But how did you know for sure you were speaking with Susan? Also, if someone else had tapped the phone line, they'd be able to listen in on your conversation.

*TLS* stands for Transport Layer Security, and it's a cryptographic layer that sits on top of TCP. It solves both of these problems by verifying the identity of hosts, and encrypting the messages they transfer. Establishing a TLS connection involves an additional three-way handshake that executes after TCP's initial handshake. Once a TLS connection is established, HTTP requests and responses are made to known, trusted hosts, and HTTP message bodies are encrypted. This is known as HTTP Secure, or HTTPS.

## Latency

One final interesting bit I learned from the article was how the handshakes affect page load time. When initializing a new session with a server, the three-step TCP handshake can potentially take 750ms or more, depending on the user's latency. Since a TLS connection requires an additional three-step handshake, simply adding HTTPS to your site can mean users on low-latency connections (such as mobile devices) could wait 1.5 seconds before your server can even begin sending data.

---

I hope you have a better idea of what HTTPS is, and how drastistically it can improve your site's security! If you'd like to learn more, I recommend [this thorough, well-written article](http://www.objc.io/issue-10/ip-tcp-http.html) by [@danielboedewadt](https://twitter.com/danielboedewadt).

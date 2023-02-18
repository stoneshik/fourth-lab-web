<%@ page import="lab.fourth.lab.security.TokenFabricSession" %>
<%@ page import="lab.fourth.lab.security.Token" %>
<%@ page contentType="text/html;charset=utf-8" %>
<%Token token = TokenFabricSession.newInstance(request);%>
<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"/><meta http-equiv="Content-type" content="text/html; charset=utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=Edge"/><link rel="icon" href="${pageContext.request.contextPath}/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/>
<meta name="_csrf" content="<%=token.token()%>"/>
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="<%=token.headerToken()%>"/><link rel="manifest" href="${pageContext.request.contextPath}/manifest.json"/><title>Стартовая страница</title><script defer="defer" src="${pageContext.request.contextPath}/static/js/main.64fa81dd.js"></script><link href="${pageContext.request.contextPath}/static/css/main.94af734b.css" rel="stylesheet"></head><body><div id="header" class="container"><div class="container"><h2>Стрельбицкий Илья</h2></div><div class="container column"><h3>Группа P32101</h3><h4>3210199 вариант</h4></div></div><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>
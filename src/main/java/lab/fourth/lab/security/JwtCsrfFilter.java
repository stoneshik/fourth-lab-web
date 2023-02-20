package lab.fourth.lab.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.*;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Pattern;

public class JwtCsrfFilter extends OncePerRequestFilter {
    private final CsrfTokenRepository tokenRepository;

    private final HandlerExceptionResolver resolver;

    public JwtCsrfFilter(
            @Autowired JwtTokenRepository tokenRepository,
            @Autowired HandlerExceptionResolver resolver) {
        this.tokenRepository = tokenRepository;
        this.resolver = resolver;
    }

    private boolean filterServletPath(String servletPath) {
        if (servletPath.equals("/") || servletPath.equals("/index") || servletPath.equals("/index.jsp") ||
                servletPath.equals("/favicon.ico") || servletPath.equals("/manifest.json") ||
                servletPath.equals("/api/user/registration") || servletPath.equals("/api/user/auth")) {
            return true;
        }
        Pattern pattern = Pattern.compile("^/static(?:/[A-Za-z0-9_.]*)*");
        return pattern.matcher(servletPath).matches();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (this.filterServletPath(request.getServletPath())) {
            try {
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                resolver.resolveException(request, response, null, new MissingCsrfTokenException(null));
            }
            return;
        }
        CsrfToken csrfToken = this.tokenRepository.loadToken(request);
        if (csrfToken == null) {
            this.resolver.resolveException(
                    request, response, null, new MissingCsrfTokenException(null)
            );
            return;
        }
        String actualToken = csrfToken.getHeaderName();
        if (actualToken == null) {
            actualToken = csrfToken.getParameterName();
        }
        try {
            if (actualToken != null) {
                Jwts.parser()
                        .setSigningKey(((JwtTokenRepository) this.tokenRepository).getSecret())
                        .parseClaimsJws(actualToken);
                filterChain.doFilter(request, response);
            } else {
                this.resolver.resolveException(
                    request, response, null, new InvalidCsrfTokenException(csrfToken, null)
                );
            }
        } catch (JwtException e) {
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Invalid CSRF token found for " + UrlUtils.buildFullRequestUrl(request));
            }
            this.resolver.resolveException(
                request, response, null, new InvalidCsrfTokenException(csrfToken, actualToken)
            );
        }
    }
}
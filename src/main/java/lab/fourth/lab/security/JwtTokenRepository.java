package lab.fourth.lab.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lab.fourth.lab.util.TokenUtil;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.DefaultCsrfToken;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;


@Repository
public class JwtTokenRepository implements CsrfTokenRepository {
    private final String secret;

    public JwtTokenRepository() {
        this.secret = "springrest";
    }

    public String getSecret() {
        return secret;
    }

    @Override
    public CsrfToken generateToken(HttpServletRequest httpServletRequest) {
        String id = UUID.randomUUID().toString().replace("-", "");
        Date now = new Date();
        Date exp = Date.from(
                LocalDateTime.now().plusMinutes(30).atZone(ZoneId.systemDefault()).toInstant()
        );
        String token = "";
        try {
            token = Jwts.builder()
                    .setId(id)
                    .setIssuedAt(now)
                    .setNotBefore(now)
                    .setExpiration(exp)
                    .signWith(SignatureAlgorithm.HS256, secret)
                    .compact();
        } catch (JwtException e) {
            e.printStackTrace();
            //ignore
        }
        return new DefaultCsrfToken("x-csrf-token", "_csrf", token);
    }

    @Override
    public void saveToken(CsrfToken csrfToken, HttpServletRequest request, HttpServletResponse response) {
        if (csrfToken != null) {
            String token = csrfToken.getToken();
            String headerToken = csrfToken.getHeaderName();
            TokenUtil.setValue(request, token, headerToken);
        }
    }

    @Override
    public CsrfToken loadToken(HttpServletRequest request) {
        TokenDto tokenDto = TokenFabric.newInstance(request);
        if (TokenUtil.isEmpty(tokenDto)) {
            return null;
        }
        return new DefaultCsrfToken(
                tokenDto.token(),
                tokenDto.parameterName(),
                tokenDto.headerToken()
        );
    }

    public void clearToken(HttpServletRequest request) {
        TokenUtil.deleteValue(request);
    }
}

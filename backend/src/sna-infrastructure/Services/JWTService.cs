using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using sna_application.Common.Utilities;
using sna_application.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace sna_infrastructure.Services;
internal class JWTService(IConfiguration configuration, UserManager<ApplicationUser> userManager) 
: IJWTService
{
    public async Task<TokenContainer> CreateTokenAsync(ApplicationUser user, bool populateExpireTime)
    {
        //Generate Token Options
        var signInCredentials = GetSignInCredentials();
        var claims = GetClaims(user);
        var tokenOptions = GenerateTokenOptions(signInCredentials,claims);
        var refreshToken = GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        if(populateExpireTime)
            user.RefreshTokenExpiresTime = DateTime.Now.AddDays(7);
        await userManager.UpdateAsync(user);
        var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return new TokenContainer(
            AccessToken:accessToken,
            RefreshToken:refreshToken
        );
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
    {
        var jwtSettings = configuration.GetRequiredSection("JwtSettings");
        return  new JwtSecurityToken(
            issuer:jwtSettings["ValidIssuer"],
            audience:jwtSettings["ValidAudience"],
            claims:claims,
            expires:DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["Expires"])),
            signingCredentials:signingCredentials
        );
    }

    private static string GenerateRefreshToken()
    {
        var randNumber = new byte[32];
        using var rnd = RandomNumberGenerator.Create();
        rnd.GetBytes(randNumber);
        return Convert.ToBase64String(randNumber);
    }

    private static List<Claim> GetClaims(ApplicationUser user)
    {
       var claims = new List<Claim>()
       {
           new(ClaimTypes.Name, user.UserName!),
           new(ClaimTypes.Email, user.Email!),
           new(ClaimTypes.NameIdentifier, user.Id.ToString()) 
       };
       return claims;
    }

    private SigningCredentials GetSignInCredentials()
    {
        var jwtSettings= configuration.GetRequiredSection("JwtSettings");
        var key = Encoding.UTF8.GetBytes(jwtSettings["secretKey"]!);
        var secretKey = new SymmetricSecurityKey(key);
        return new SigningCredentials(key:secretKey,algorithm:SecurityAlgorithms.HmacSha256);
    }
}
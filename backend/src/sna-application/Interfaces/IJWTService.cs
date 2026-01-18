using sna_application.Common.Utilities;

namespace sna_application.Interfaces;   
public interface IJWTService
{
    Task<TokenContainer> CreateTokenAsync(ApplicationUser user, bool populateExpireTime);

}

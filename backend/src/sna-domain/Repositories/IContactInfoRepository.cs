namespace sna_domain.Repositories;

public interface IContactInfoRepository
{
    Task<IEnumerable<ContactInfo>> GetAllContactInfosAsync(bool trackChChanges);
    Task<ContactInfo?> GetOneContactInfoAsync(int Id, bool trackChChanges);
    Task AddContactInfoAsync(ContactInfo contactInfo);
    void EditContactInfo(ContactInfo contactInfo);
    void DeleteContactInfo(ContactInfo contactInfo);
}

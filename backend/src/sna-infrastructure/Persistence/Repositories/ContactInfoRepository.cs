namespace sna_infrastructure.Persistence.Repositories;

internal class ContactInfoRepository(GraphVDbContext context)
: RepositoryBase<ContactInfo>(context), IContactInfoRepository
{
    public async Task AddContactInfoAsync(ContactInfo contactInfo)
                    =>await Create(contactInfo);
    public void DeleteContactInfo(ContactInfo contactInfo)
            => Delete(contactInfo);
    public void EditContactInfo(ContactInfo contactInfo) 
            => _context.Update(entity:contactInfo);
    public async Task<IEnumerable<ContactInfo>> GetAllContactInfosAsync(bool trackChChanges)
        => await GetAllAsync(trackChChanges);

    public async Task<ContactInfo?> GetOneContactInfoAsync(Guid Id, bool trackChChanges)
        => await GetOneByIdAsync(c=>c.Id==Id,trackChChanges)!;
}

namespace sna_application.Messages.Dtos;

public record MessageDto(Guid Id, string FullName, string Email, string Phone, string Content , bool IsRead);


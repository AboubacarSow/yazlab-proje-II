namespace sna_application.Messages.Dtos;

public record MessageDto(int Id, 
                string FullName, 
                string Email, 
                string Phone,
                string Content ,
                bool IsRead);


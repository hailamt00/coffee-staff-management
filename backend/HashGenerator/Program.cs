using BCrypt.Net;

Console.WriteLine("Password: admin123");
Console.WriteLine("Hash:");
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("123456"));
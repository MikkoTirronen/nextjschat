namespace nextjschat.Models;

public sealed record Conversation(
    string Id,
    string Name,
    string Initials,
    string Preview,
    string Time,
    bool Online,
    int Unread = 0,
    string Accent = "sage");

public sealed record ChatMessage(
    string Id,
    string ConversationId,
    string Sender,
    string Body,
    DateTimeOffset SentAt,
    bool IsMine,
    MessageState State = MessageState.Delivered);

public enum MessageState { Sending, Sent, Delivered, Read, Failed }

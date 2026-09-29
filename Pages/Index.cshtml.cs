using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using nextjschat.Models;

namespace _identity_template.Pages;

[Authorize]
public sealed class IndexModel : PageModel
{
    public IReadOnlyList<Conversation> Conversations { get; } =
    [
        new("elena", "Elena Vasquez", "EV", "Sounds good — I’ll review it today.", "09:42", true, Accent: "rose"),
        new("product", "Product team", "PT", "Jonas: The build is ready to test", "08:18", true, 3, "amber"),
        new("marcus", "Marcus Chen", "MC", "Thanks for the heads-up!", "Mon", false, Accent: "blue"),
        new("design", "Design circle", "DC", "You: Updated the handoff notes", "Mon", true, Accent: "violet"),
        new("sarah", "Sarah Lind", "SL", "Let’s catch up next week", "Sun", false, Accent: "sage")
    ];

    public IReadOnlyList<ChatMessage> Messages { get; } =
    [
        new("1", "elena", "Elena Vasquez", "Morning! I’ve finished the security review for the new sign-in flow.", DateTimeOffset.Now.AddMinutes(-28), false, MessageState.Read),
        new("2", "elena", "Me", "Great timing. Did anything important come up?", DateTimeOffset.Now.AddMinutes(-25), true, MessageState.Read),
        new("3", "elena", "Elena Vasquez", "Nothing blocking. I left two notes about session expiry and recovery codes — both should be quick fixes.", DateTimeOffset.Now.AddMinutes(-21), false, MessageState.Read),
        new("4", "elena", "Me", "Perfect. Send it over and I’ll get those handled before the next build.", DateTimeOffset.Now.AddMinutes(-17), true, MessageState.Read),
        new("5", "elena", "Elena Vasquez", "Sounds good — I’ll review it today.", DateTimeOffset.Now.AddMinutes(-4), false, MessageState.Delivered)
    ];

    public string UserInitials
    {
        get
        {
            var name = User.Identity?.Name;
            return string.IsNullOrWhiteSpace(name)
                ? "ME"
                : string.Concat(name.Split([' ', '@'], StringSplitOptions.RemoveEmptyEntries).Take(2).Select(x => char.ToUpperInvariant(x[0])));
        }
    }

    public void OnGet() { }
}

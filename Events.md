# 🎮 Events

The PVP Bot uses an event-driven architecture to handle game events and trigger bot actions.

## 📋 Overview

The event system allows you to:
- Listen to Minecraft game events
- Create custom event handlers
- Trigger bot actions based on events
- Extend bot functionality with plugins

## 🔧 Event Types

### Combat Events

Events related to combat and PVP:

```java
// Player attack event
public class PlayerAttackEvent extends Event {
    private final Entity target;
    private final float damage;
    
    // Event handling code
}
```

### Movement Events

Events related to player movement:

```java
// Player move event
public class PlayerMoveEvent extends Event {
    private final Vec3d from;
    private final Vec3d to;
    
    // Event handling code
}
```

### Chat Events

Events related to chat messages:

```java
// Chat message event
public class ChatMessageEvent extends Event {
    private final String message;
    private final String sender;
    
    // Event handling code
}
```

## 📝 Creating Custom Events

To create a custom event:

1. Extend the `Event` class
2. Add necessary fields and getters
3. Register the event in the event bus

### Example

```java
public class CustomBotEvent extends Event {
    private final String data;
    
    public CustomBotEvent(String data) {
        this.data = data;
    }
    
    public String getData() {
        return data;
    }
}
```

## 🎯 Event Handlers

### Registering Event Handlers

```java
@EventHandler
public void onPlayerAttack(PlayerAttackEvent event) {
    Entity target = event.getTarget();
    // Handle the event
}
```

### Event Priority

Events can have different priorities:

- `LOWEST` - Runs first
- `LOW`
- `NORMAL` - Default priority
- `HIGH`
- `HIGHEST` - Runs last

```java
@EventHandler(priority = EventPriority.HIGH)
public void onHighPriorityEvent(CustomEvent event) {
    // This runs before normal priority handlers
}
```

## 🔄 Event Flow

1. Game event occurs
2. Event is created and posted to event bus
3. All registered handlers are called in priority order
4. Event can be cancelled by handlers
5. If not cancelled, default behavior executes

## ⚠️ Best Practices

- Don't perform heavy operations in event handlers
- Use async tasks for long-running operations
- Always check if event is cancelled before processing
- Unregister handlers when no longer needed

## 🧪 Testing Events

```java
@Test
public void testCustomEvent() {
    CustomBotEvent event = new CustomBotEvent("test");
    EventBus.post(event);
    
    // Assert expected behavior
}
```

## 📚 Available Events

| Event | Description | Cancellable |
|-------|-------------|-------------|
| `PlayerAttackEvent` | Fired when player attacks | Yes |
| `PlayerMoveEvent` | Fired when player moves | Yes |
| `ChatMessageEvent` | Fired on chat message | No |
| `BotTickEvent` | Fired every game tick | No |

## 🔗 Related

- [Architecture Overview](#)
- [Plugin Development](#)
- [API Reference](#)

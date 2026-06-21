export function getEventColor(type: string) {
  switch (type) {
    case "foundation":
      return "from-blue-500 to-blue-600";
    case "milestone":
      return "from-purple-500 to-purple-600";
    case "reform":
      return "from-green-500 to-green-600";
    case "achievement":
      return "from-orange-500 to-orange-600";
    default:
      return "from-gray-500 to-gray-600";
  }
}

export function getEventIcon(type: string) {
  switch (type) {
    case "foundation":
      return "🏛️";
    case "milestone":
      return "⭐";
    case "reform":
      return "🔨";
    case "achievement":
      return "🎯";
    default:
      return "📅";
  }
}

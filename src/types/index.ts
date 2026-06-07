export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "certification" | "award" | "milestone";
  image?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  notes?: string;
  status: "reading" | "completed";
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "replied" | "archived";
  createdAt: string;
  repliedAt?: string;
  replyMessage?: string;
}

export interface AnalyticsEvent {
  id: string;
  eventType: string;
  pagePath?: string;
  userLocation?: {
    country: string;
    city: string;
    region: string;
  };
  deviceInfo?: {
    browser: string;
    os: string;
    deviceType: string;
  };
  timestamp: string;
}

export interface WebVital {
  metricName: string;
  metricValue: number;
  pagePath: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "guest";
  name?: string;
  company?: string;
}

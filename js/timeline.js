import { TIMELINE_EVENTS } from './constants.js';

class Timeline {
    constructor() {
        this.events = TIMELINE_EVENTS;
        this.container = document.querySelector('.timeline');
        this.activeWindowDisplay = document.querySelector('.active-window');
        this.timelineTrack = document.querySelector('.timeline-track');
        this.currentTime = null;
        this.timeInterval = null;
    }

    // Initialize the timeline
    init() {
        this.createEvents();
        this.startClock();
        // Update every 30 seconds
        this.timeInterval = setInterval(() => this.updateTimeline(), 30000);
    }

    // Get current time in NY timezone
    getCurrentNYTime() {
        return new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Convert HH:mm to minutes since midnight
    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Create timeline events
    createEvents() {
        this.events.forEach(event => {
            const eventEl = document.createElement('div');
            eventEl.className = 'timeline-event';
            
            eventEl.innerHTML = `
                <div class="event-emoji">${event.emoji}</div>
                <div class="event-time">${event.startTime}</div>
                <div class="event-name">${event.name}</div>
            `;

            // Position event on timeline
            const startMinutes = this.timeToMinutes(event.startTime);
            const position = (startMinutes - 540) * 2; // 540 = 9:00 AM in minutes
            eventEl.style.left = `${position}px`;
            
            this.timelineTrack.appendChild(eventEl);
        });
    }

    // Update timeline state
    updateTimeline() {
        const currentTime = this.getCurrentNYTime();
        const currentMinutes = this.timeToMinutes(currentTime);

        // Update current time marker
        this.updateTimeMarker(currentMinutes);

        // Update events states
        this.updateEventStates(currentMinutes);

        // Update active window display
        this.updateActiveWindow(currentMinutes);

        // Check for warnings
        this.checkWarnings(currentMinutes);
    }

    // Update current time marker position and scroll
    updateTimeMarker(currentMinutes) {
        const marker = document.querySelector('.current-time-marker') || 
                      document.createElement('div');
        
        if (!marker.className) {
            marker.className = 'current-time-marker';
            this.timelineTrack.appendChild(marker);
        }

        const position = (currentMinutes - 540) * 2;
        marker.style.left = `${position}px`;
        
        // Keep current time in the middle
        const timelineWidth = this.container.offsetWidth;
        this.container.scrollLeft = position - (timelineWidth / 2);
    }

    // Update event states (past, active, future)
    updateEventStates(currentMinutes) {
        const events = document.querySelectorAll('.timeline-event');
        
        events.forEach((eventEl, index) => {
            const event = this.events[index];
            const startMinutes = this.timeToMinutes(event.startTime);
            const endMinutes = this.timeToMinutes(event.endTime);

            eventEl.classList.remove('event-past', 'event-active', 'event-future');

            if (currentMinutes >= endMinutes) {
                eventEl.classList.add('event-past');
            } else if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
                eventEl.classList.add('event-active');
            } else {
                eventEl.classList.add('event-future');
            }
        });
    }

    // Update active window display
    updateActiveWindow(currentMinutes) {
        const activeEvent = this.events.find(event => {
            const startMinutes = this.timeToMinutes(event.startTime);
            const endMinutes = this.timeToMinutes(event.endTime);
            return currentMinutes >= startMinutes && currentMinutes < endMinutes;
        });

        if (activeEvent && this.activeWindowDisplay) {
            this.activeWindowDisplay.innerHTML = 
                `${activeEvent.emoji} ${activeEvent.name} window active`;
            this.activeWindowDisplay.style.display = 'block';
        } else if (this.activeWindowDisplay) {
            this.activeWindowDisplay.style.display = 'none';
        }
    }

    // Check and display warnings
    checkWarnings(currentMinutes) {
        this.events.forEach(event => {
            if (!event.warningMinutes) return;

            const startMinutes = this.timeToMinutes(event.startTime);
            const warningTime = startMinutes - event.warningMinutes;

            if (currentMinutes === warningTime) {
                this.showWarning(event);
            }
        });
    }

    // Show warning notification
    showWarning(event) {
        // Simple alert for now, can be enhanced later
        alert(`${event.emoji} ${event.name} starting in ${event.warningMinutes} minutes!`);
    }

    // Start the clock
    startClock() {
        this.updateTimeline();
    }

    // Clean up
    destroy() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    }
}

export default Timeline;

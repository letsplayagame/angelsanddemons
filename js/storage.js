class Storage {
    constructor() {
        this.STORAGE_KEY = 'tradingJournal_session';
    }

    // Save session data
    saveSession(data) {
        try {
            const sessionData = {
                lastUpdated: new Date().toISOString(),
                entries: data.entries,
                demonCounts: data.demonCounts
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
            return true;
        } catch (error) {
            console.error('Error saving session:', error);
            return false;
        }
    }

    // Load session data
    loadSession() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) return null;

            const sessionData = JSON.parse(data);
            
            // Check if session is from today (NY timezone)
            const lastUpdated = new Date(sessionData.lastUpdated);
            const nyDate = new Date().toLocaleDateString('en-US', {
                timeZone: 'America/New_York'
            });
            const sessionDate = lastUpdated.toLocaleDateString('en-US', {
                timeZone: 'America/New_York'
            });

            // If session is not from today, return null
            if (sessionDate !== nyDate) {
                this.clearSession();
                return null;
            }

            return sessionData;
        } catch (error) {
            console.error('Error loading session:', error);
            return null;
        }
    }

    // Clear session data
    clearSession() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing session:', error);
            return false;
        }
    }

    // Auto-save setup for Logger
    setupAutoSave(logger) {
        // Save every minute
        setInterval(() => {
            this.saveSession({
                entries: logger.entries,
                demonCounts: logger.demonCounts
            });
        }, 60000);

        // Save before page unload
        window.addEventListener('beforeunload', () => {
            this.saveSession({
                entries: logger.entries,
                demonCounts: logger.demonCounts
            });
        });
    }

    // Initialize logger with saved data
    initializeLogger(logger) {
        const savedData = this.loadSession();
        if (savedData) {
            logger.entries = savedData.entries;
            logger.demonCounts = savedData.demonCounts;
            return true;
        }
        return false;
    }
}

export default Storage;
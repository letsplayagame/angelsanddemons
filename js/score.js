class Score {
    constructor() {
        this.currentScore = 0;
        this.messages = {
            excellent: [
                "You're in the zone! Size up carefully.",
                "Outstanding performance! Stay focused."
            ],
            good: [
                "Solid trading! Keep it up.",
                "Good momentum, maintain discipline."
            ],
            neutral: [
                "Stay focused on your setups.",
                "Keep following your rules."
            ],
            poor: [
                "Time to tighten up. Reduce size.",
                "Step back and reassess your trades."
            ],
            critical: [
                "STOP TRADING! Take a break.",
                "Step away from the screen now."
            ]
        };
    }

    // Update score with new entry
    updateScore(entry) {
        this.currentScore += entry.scoreImpact;
        return this.getStatusUpdate();
    }

    // Get current score
    getScore() {
        return this.currentScore;
    }

    // Get trading status based on score
    getStatus() {
        if (this.currentScore >= 5) return 'excellent';
        if (this.currentScore >= 3) return 'good';
        if (this.currentScore >= 0) return 'neutral';
        if (this.currentScore >= -3) return 'poor';
        return 'critical';
    }

    // Get sizing recommendation
    getSizeRecommendation() {
        const status = this.getStatus();
        switch (status) {
            case 'excellent':
                return 'FULL SIZE';
            case 'good':
                return 'NORMAL SIZE';
            case 'neutral':
                return 'REDUCED SIZE';
            case 'poor':
                return 'MINIMUM SIZE';
            case 'critical':
                return 'NO TRADING';
            default:
                return 'REDUCED SIZE';
        }
    }

    // Get status color
    getStatusColor() {
        const status = this.getStatus();
        switch (status) {
            case 'excellent':
                return '#27ae60'; // green
            case 'good':
                return '#2ecc71'; // light green
            case 'neutral':
                return '#f1c40f'; // yellow
            case 'poor':
                return '#e67e22'; // orange
            case 'critical':
                return '#c0392b'; // red
            default:
                return '#7f8c8d'; // gray
        }
    }

    // Get motivational message
    getMessage() {
        const status = this.getStatus();
        const messages = this.messages[status];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Get complete status update
    getStatusUpdate() {
        return {
            score: this.currentScore,
            status: this.getStatus(),
            message: this.getMessage(),
            sizing: this.getSizeRecommendation(),
            color: this.getStatusColor()
        };
    }

    // Reset score
    reset() {
        this.currentScore = 0;
        return this.getStatusUpdate();
    }

    // Calculate streak (consecutive positive or negative actions)
    calculateStreak(entries) {
        if (!entries.length) return 0;
        
        let streak = 0;
        const firstImpact = entries[0].scoreImpact;
        const isPositive = firstImpact > 0;

        for (const entry of entries) {
            if ((isPositive && entry.scoreImpact > 0) || 
                (!isPositive && entry.scoreImpact < 0)) {
                streak++;
            } else {
                break;
            }
        }

        return isPositive ? streak : -streak;
    }
}

export default Score;
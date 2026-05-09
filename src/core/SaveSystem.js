class SaveSystem {
    static KEY = 'supermiguel_save_v3';

    static defaultSave() {
        return {
            totalStars: 0,
            totalCoins: 0,
            worlds: WORLDS.reduce((acc, w) => {
                acc[w.id] = { unlocked: w.unlocked, levels: {} };
                return acc;
            }, {}),
            settings: { sfx: true, music: true },
        };
    }

    static load() {
        try {
            const raw = localStorage.getItem(this.KEY);
            if (!raw) return this.defaultSave();
            return JSON.parse(raw);
        } catch { return this.defaultSave(); }
    }

    static save(data) {
        try { localStorage.setItem(this.KEY, JSON.stringify(data)); }
        catch { }
    }

    static completeLevel(worldId, levelNum, stars, coins) {
        const data = this.load();
        if (!data.worlds[worldId]) data.worlds[worldId] = { unlocked: true, levels: {} };
        const lvl = data.worlds[worldId].levels[levelNum] || { stars: 0, coins: 0, completed: false };
        const isNew = !lvl.completed;
        const prevStars = lvl.stars || 0;
        lvl.stars = Math.max(lvl.stars || 0, stars);
        lvl.coins = Math.max(lvl.coins || 0, coins);
        lvl.completed = true;
        data.worlds[worldId].levels[levelNum] = lvl;
        if (isNew) data.totalStars += stars;
        else data.totalStars += Math.max(0, stars - prevStars);
        data.totalCoins += coins;

        const maxLevel = WORLDS.find(w => w.id === worldId)?.levels || 10;
        if (levelNum >= maxLevel) {
            const worldIdx = WORLDS.findIndex(w => w.id === worldId);
            const next = WORLDS[worldIdx + 1];
            if (next) data.worlds[next.id] = data.worlds[next.id] || { unlocked: false, levels: {} };
            if (next) data.worlds[next.id].unlocked = true;
        } else {
            data.worlds[worldId].levels[levelNum + 1] = data.worlds[worldId].levels[levelNum + 1] || { stars: 0, coins: 0, completed: false };
        }

        this.save(data);
        return data;
    }

    static reset() {
        localStorage.removeItem(this.KEY);
    }

    static isLevelUnlocked(worldId, levelNum) {
        const data = this.load();
        if (levelNum === 1) return data.worlds[worldId]?.unlocked ?? false;
        return data.worlds[worldId]?.levels[levelNum - 1]?.completed ?? false;
    }

    static getLevelStars(worldId, levelNum) {
        return this.load().worlds[worldId]?.levels[levelNum]?.stars ?? 0;
    }
}

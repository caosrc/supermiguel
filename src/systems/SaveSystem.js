const SaveSystem = {
    SAVE_KEY: 'superMiguel_save',

    save(data) {
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Erro ao salvar:', e);
        }
    },

    load() {
        try {
            const raw = localStorage.getItem(this.SAVE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    reset() {
        localStorage.removeItem(this.SAVE_KEY);
    },

    defaultData() {
        return {
            pontos: 0,
            moedas: 0,
            fase: 1,
            cidadesVisitadas: ['Lagoa Dourada'],
            medalhas: [],
            amizadeFamilia: 0
        };
    }
};

const keyVal = "kevin"
export const storageService = {
    dbconfig: "db_config",
    app: "app",
    // apiUrl: "app_url_v",
    // waiter: "selected_waiter_nn",
    // waiter_name: "waiter_name",
    // kitchen_printer: "kitchen_printer_nn",
    // restaurant_printer: "restaurant_printer_nn",
    // customer_printer: "customer_printer",
    token: "token",
    user: "user",
    setToken(tokentype: string, token: string): Promise<Boolean> {
        return new Promise((resolve) => {
            try {
                localStorage.setItem(keyVal+'_'+tokentype, token);
                resolve(true);
            } catch (e) {
                resolve(false);
            }

        })

    },

    getToken(tokentype: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            try {
                const val = localStorage.getItem(keyVal+'_'+tokentype);
                resolve(val);
            } catch (e) {
                resolve(null);
            }

        })
    },
    getTokenDirectly(tokentype: string){
        return localStorage.getItem(keyVal+'_'+tokentype);
    },
    deleteToken(tokentype: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(keyVal+'_'+tokentype);
                resolve(true);
            } catch (e) {
                resolve(false);
            }
        });
    },
}

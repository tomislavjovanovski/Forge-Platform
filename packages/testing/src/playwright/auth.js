export async function injectAuthToken(page, token) {
    await page.addInitScript((authToken) => {
        window.localStorage.setItem('forge.authToken', authToken);
    }, token);
}
export async function setAuthCookie(page, token) {
    await page.context().addCookies([
        {
            name: 'forge-auth',
            value: token,
            domain: '127.0.0.1',
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',
        },
    ]);
}
//# sourceMappingURL=auth.js.map
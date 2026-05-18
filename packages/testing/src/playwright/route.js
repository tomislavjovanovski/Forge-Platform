export async function mockApiEndpoint(page, url, response, status = 200, method = 'GET') {
    await page.route(url, (route) => {
        if (route.request().method() !== method) {
            return route.fallback();
        }
        return route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify(response),
        });
    });
}
//# sourceMappingURL=route.js.map
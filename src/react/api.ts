import NotFound from '../errors/NotFound';

export default function api<T>(url: string, options: RequestInit = {}): Promise<T> {
    return fetch('/api' + url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        ...options
    }).then(async (response: any): Promise<T> => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new NotFound(response.statusText);
            }
            throw new Error(await response.text() || response.statusText);
        }
        return response.json().catch((): Promise<T> => response.text) as Promise<T>;
    });
}

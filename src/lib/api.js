//
// src/lib/api.js
//
export async function fetchInitialData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            console.error("Session invalid or API error, status:", response.status);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch initial data:", error);
        return null;
    }
}

export async function login(password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        return response; // 返回完整的 response 对象供组件处理
    } catch (error) {
        console.error("Login request failed:", error);
        return { ok: false, error: '网络请求失败' };
    }
}

export async function saveMisubs(misubs) {
    try {
        const response = await fetch('/api/misubs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ misubs })
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: '网络请求失败' };
    }
}

export async function fetchNodeCount(subUrl) {
    try {
        const res = await fetch('/api/node_count', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: subUrl })
        });
        const data = await res.json();
        console.log('后端返回:', data); // 调试日志
        return typeof data.count === 'number' ? data.count : 0;
    } catch (e) {
        console.error('fetchNodeCount error:', e);
        return 0;
    }
}

export async function fetchSettings() {
    try {
        const response = await fetch('/api/settings');
        if (!response.ok) return {};
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return {};
    }
}

export async function saveSettings(settings) {
    try {
        const response = await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: '网络请求失败' };
    }
}
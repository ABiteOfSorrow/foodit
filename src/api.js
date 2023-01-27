const BASE_URL = "https://learn.codeit.kr/9026/foods?"

export async function getFoods({order = "", cursor = "", limit = 10, search = ""}) {
    const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
    const rawResponse = await fetch(`${BASE_URL}${query}`);

    if (!rawResponse.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다!');
    }
    const response = await rawResponse.json();
    return response;
}

export async function createFood(formData) {
    const rawResponse = await fetch(`${BASE_URL}`, {
        method: 'POST',
        body: formData,
    })

    if (!rawResponse.ok) {
        throw new Error('리뷰를 작성하는데 실패했습니다!');
    }
    const response = await rawResponse.json();
    return response;
}

export async function updateFood(id, formData) {
    const rawResponse = await fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        body: formData,
    });
    if (!rawResponse.ok) {
        throw new Error('데이터를 수정하는데 실패 했습니다.');
    }

    const response = await rawResponse.json();
    return response
}
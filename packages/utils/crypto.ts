/**
 * SHA-512로 문자열을 암호화합니다.
 * @param text 암호화할 문자열
 * @returns SHA-512 해시 문자열 (16진수)
 */
export async function sha512(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
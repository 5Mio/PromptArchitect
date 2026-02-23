import sys
import requests
from bs4 import BeautifulSoup

def extract_web_content(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Remove script and style elements
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()

        # Get title
        title = soup.title.string if soup.title else "Kein Titel gefunden"
        
        # Get text
        text = soup.get_text(separator='\n')
        
        # Clean up text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = '\n'.join(chunk for chunk in chunks if chunk)

        return title, text
    except Exception as e:
        print(f"Fehler beim Extrahieren der Webseite: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Verwendung: python3 extract_content.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    title, content = extract_web_content(url)
    print(f"TITEL: {title}\n")
    print("-" * 20)
    print(content[:5000]) # Limit output to avoid context bloat
    if len(content) > 5000:
        print("\n... (Inhalt gekürzt)")

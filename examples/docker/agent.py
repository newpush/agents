import os
from google import genai
from google.genai import types

def main():
    # 1. Verify the environment variable was injected safely by Docker
    # We use GEMINI_API_KEY for consistency with the workshop prompt,
    # but the SDK also looks for GOOGLE_API_KEY by default.
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ ERROR: GEMINI_API_KEY not found.")
        print("Did you run the pre-flight script and start Docker with the .env file?")
        return

    print("🤖 Initializing Project NoéMI Base Agent...")

    # 2. Initialize the Gemini Client with the provided API key
    client = genai.Client(api_key=api_key)

    # 3. Description Phase: Define the Agent's rules of engagement
    sys_instruct = "You are a logical, concise AI assistant for Project NoéMI. Respond directly and clearly."
    prompt = "Acknowledge your activation and state your primary objective in exactly one sentence."

    print(f"🧠 Sending Prompt: '{prompt}'\n")

    # 4. Execute the cognitive task
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=sys_instruct,
                temperature=0.2, # Low temperature for logical, predictable responses
            ),
        )
        print("✅ Agent Response:")
        # Print the response in green text for visual feedback
        print(f"\033[92m{response.text}\033[0m")

    except Exception as e:
        print(f"❌ Execution Failed: {e}")

if __name__ == "__main__":
    main()

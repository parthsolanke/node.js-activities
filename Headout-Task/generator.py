import os
import random
import string

def generate_random_text_with_newlines(size, newline_frequency):
    text = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(size))
    return '\n'.join(text[i:i+newline_frequency] for i in range(0, len(text), newline_frequency))

def generate_and_save_files(num_files, file_size_mb, output_directory):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for i in range(1, num_files + 1):
        file_path = os.path.join(output_directory, f"{i}.txt")
        with open(file_path, 'w') as file:
            # Generate random text content with new lines
            random_text = generate_random_text_with_newlines(file_size_mb * 1024 * 1024, 100)
            file.write(random_text)

        print(f"File {i}.txt generated and saved at {output_directory}")

if __name__ == "__main__":
    num_files = 30
    file_size_mb = 100
    output_directory = './tmp/data/'

    generate_and_save_files(num_files, file_size_mb, output_directory)


# import os
# import json

# def analyze_json_structure(data, current_depth=0, max_depth=[0], deepest_key=[None]):
#     if isinstance(data, dict):
#         for key, value in data.items():
#             analyze_json_structure(value, current_depth + 1, max_depth, deepest_key)
#             if current_depth + 1 > max_depth[0]:
#                 max_depth[0] = current_depth + 1
#                 deepest_key[0] = key
#     elif isinstance(data, list):
#         for item in data:
#             analyze_json_structure(item, current_depth + 1, max_depth, deepest_key)
#             if current_depth + 1 > max_depth[0]:
#                 max_depth[0] = current_depth + 1
#                 deepest_key[0] = None
#     return max_depth[0], deepest_key[0]

# def main():
#     folder_path = "./data"
    
#     try:
#         for filename in os.listdir(folder_path):
#             if filename.endswith(".json"):
#                 file_path = os.path.join(folder_path, filename)
#                 with open(file_path, 'r') as file:
#                     try:
#                         data = json.load(file)
#                         max_depth, deepest_key = analyze_json_structure(data)
#                         print(f"File: {filename}")
#                         print(f"Max depth: {max_depth}")
#                         print(f"Deepest nested component: {deepest_key}")
#                         print("-" * 30)
#                     except json.JSONDecodeError:
#                         print(f"Error: {filename} is not a valid JSON file.")
#     except FileNotFoundError:
#         print(f"Error: The folder '{folder_path}' was not found.")
#     except PermissionError:
#         print(f"Error: Permission denied to access the folder '{folder_path}'.")

# if __name__ == "__main__":
#     main()

import os
import json

def get_optionlists(data):
    try:
        return data['data']['itemPage']['optionLists']
    except KeyError:
        return None

def analyze_optionlists(optionlists, current_path=None, max_depth=0, deepest_branch=None):
    if current_path is None:
        current_path = []

    if isinstance(optionlists, dict):
        for key, value in optionlists.items():
            new_path = current_path + [key]
            new_depth, new_branch = analyze_optionlists(value, new_path, max_depth, deepest_branch)
            if new_depth > max_depth:
                max_depth = new_depth
                deepest_branch = new_branch
    elif isinstance(optionlists, list):
        for i, item in enumerate(optionlists):
            new_path = current_path + [i]
            new_depth, new_branch = analyze_optionlists(item, new_path, max_depth, deepest_branch)
            if new_depth > max_depth:
                max_depth = new_depth
                deepest_branch = new_branch
    else:
        return len(current_path), (current_path, optionlists)

    return max_depth, deepest_branch

def visualize_deepest_branch(optionlists, branch):
    path, _ = branch
    current_data = optionlists
    output = "optionLists"
    for i, key in enumerate(path):
        if isinstance(current_data, dict):
            output += f"\n{'  ' * (i + 1)}'{key}': "
            current_data = current_data[key]
        elif isinstance(current_data, list):
            output += f"\n{'  ' * (i + 1)}[{key}]: "
            current_data = current_data[key]
    
    if isinstance(current_data, (dict, list)):
        output += json.dumps(current_data, indent=2)
    else:
        output += repr(current_data)
    
    return output

def analyze_and_visualize_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    optionlists = get_optionlists(data)
    if optionlists is None:
        print(f"File: {os.path.basename(file_path)}")
        print("Error: OptionLists not found in the specified path.")
        print("-" * 30)
        return

    max_depth, deepest_branch = analyze_optionlists(optionlists)
    
    print(f"File: {os.path.basename(file_path)}")
    print(f"Max depth within OptionLists: {max_depth}")
    print("Deepest branch in OptionLists:")
    print(visualize_deepest_branch(optionlists, deepest_branch))
    print("-" * 30)

def main():
    folder_path = "./data"
    
    try:
        for filename in os.listdir(folder_path):
            if filename.endswith(".json"):
                file_path = os.path.join(folder_path, filename)
                try:
                    analyze_and_visualize_json(file_path)
                except json.JSONDecodeError:
                    print(f"Error: {filename} is not a valid JSON file.")
    except FileNotFoundError:
        print(f"Error: The folder '{folder_path}' was not found.")
    except PermissionError:
        print(f"Error: Permission denied to access the folder '{folder_path}'.")

if __name__ == "__main__":
    main()
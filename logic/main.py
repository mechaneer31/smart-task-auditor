to_do_list = {
    "buy groceries": {"priority": "high", "category": "home"},
    "get garden tools": {"priority": "low", "category": "home"},
    "set meeting with client": {"priority": "high", "category": "work"},
    "get new dog tag": {"priority": "low", "category": "home"},
    "schedule vehicle maintenance": {"priority": "medium", "category": "vehicle"},
}
# print(to_do_list)

# print("buy groceries: ", to_do_list["buy groceries"])
# print("buy groceries priority: ", {to_do_list["buy groceries"]["priority"]})


for item in to_do_list:
    print(
        item,
        "priority is",
        to_do_list[item]["priority"],
        "and category is",
        to_do_list[item]["category"],
    )

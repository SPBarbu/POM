#include "pomclient.h"

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/epoll.h>

#define STDIN		   0
#define MAX_FDS		   2
#define MAX_EVENTS	   2
#define TIMEOUT	   	 100

void print_rule();
void print_menu();
void menu_prompt();
void elem_prompt1(struct epoll_event, char *, char *);
void elem_prompt2(struct epoll_event, char *, char *, char *);
void elem_prompt3(struct epoll_event, char *, char *, char *, char *, char *);
void attr_prompt1(struct epoll_event, char *, char *, char *);
void attr_prompt2(struct epoll_event, char *, char *, char *, char *);
void subscribe_prompt(struct epoll_event, char *, char *, int *, int *);
void service_prompt1(struct epoll_event, char *, char *, char *);
void service_prompt2(struct epoll_event, char *, char *);

void proc_notif(char *);

int main(int argc, char *argv[]) {

	int sockfd, epfd, rfds, format, i, event = 0, capture = 0;
	const char* client_POM;
	struct epoll_event revs[MAX_EVENTS];
	char client_ID[32], server_ID[32], arg1[32], arg2[32], arg3[32], arg4[32], arg5[32];
	char input[BUFFER_SIZE], notification[BUFFER_SIZE];

	if (argc < 4) {
		fprintf(stderr,"usage: %s filename hostname port \n", argv[0]);
		exit(0);
	}

	client_POM = load_POM(argv[1]);
	sockfd = connect_server(argv[2], argv[3]);

	epfd = epoll_setup(MAX_FDS);
	epoll_read_fd(epfd, STDIN);
	epoll_read_fd(epfd, sockfd);

	set_notif_handler(proc_notif);
	register_POM(sockfd, client_POM, client_ID, server_ID);

	print_rule();
	printf("\t .----------------.  .----------------.  .----------------.\n"
			"\t| .--------------. || .--------------. || .--------------. |\n"
			"\t| |   ______     | || |     ____     | || | ____    ____ | |\n"
			"\t| |  |_   __ \\   | || |   -' __ '-   | || ||_   \\  /   _|| |\n"
			"\t| |    | |__) |  | || |  |  |  |  |  | || |  |   \\/   |  | |\n"
			"\t| |    |  ___/   | || |  |  |  |  |  | || |  | |\\  /| |  | |\n"
			"\t| |   _| |_      | || |  |  |__|  |  | || | _| |_\\/_| |_ | |\n"
			"\t| |  |_____|     | || |   -.____.-   | || ||_____||_____|| |\n"
			"\t| |              | || |              | || |              | |\n"
			"\t| '--------------' || '--------------' || '--------------' |\n"
 			"\t'-----------------' '-----------------' '-----------------' \n");
	print_menu();
	menu_prompt();

	while (1) {
		rfds = epoll_wait(epfd, revs, MAX_EVENTS, TIMEOUT);
		if (rfds <= 0) continue;

		for (i = 0; i < rfds; i++) {
			if (revs[i].events & EPOLLIN)  {
				if (revs[i].data.fd == STDIN) {
					read(revs[i].data.fd, input, BUFFER_SIZE);
					strchr(input, '\n')[0] = '\0';

					if (!strcmp(input, "0") || !strcmp(input, "menu")) {
						print_menu();
						menu_prompt();
						continue;
					}
					else if (!strcmp(input, "1")) {
						elem_prompt1(revs[i], arg1, arg2);

						if (get_element_value(sockfd, arg1, arg2, arg3))
							printf("Error retrieving value: %s\n", req_error);
						else
							printf("Value: %s\n", arg3);
						print_rule();
					}
					else if (!strcmp(input, "2")) {
						elem_prompt2(revs[i], arg1, arg2, arg3);

						if (set_element_value(sockfd, arg1, arg2, arg3))
							printf("Error setting value: %s\n", req_error);
						else
							printf("Value of %s has been set to \"%s\"\n", arg2, arg3);
						print_rule();
					}
					else if (!strcmp(input, "3")) {
						elem_prompt3(revs[i], arg1, arg2, arg3, arg4, arg5);

						if (insert_element_node(sockfd, arg1, arg2, arg3, arg4, arg5))
							printf("Error inserting element node: %s\n", req_error);
						else
							printf("Element node inserted successfully\n");
						print_rule();
					}
					else if (!strcmp(input, "4")) {
						elem_prompt1(revs[i], arg1, arg2);

						if (remove_element_node(sockfd, arg1, arg2))
							printf("Error removing element node: %s\n", req_error);
						else
							printf("Element ode removed successfully\n");
						print_rule();
					}
					else if (!strcmp(input, "5")) {
						attr_prompt1(revs[i], arg1, arg2, arg3);

						if (get_attr_value(sockfd, arg1, arg2, arg3, arg4))
							printf("Error retrieving value: %s\n", req_error);
						else
							printf("Value: %s\n", arg4);
						print_rule();
					}
					else if (!strcmp(input, "6")) {
						attr_prompt2(revs[i], arg1, arg2, arg3, arg4);

						if (set_attr_value(sockfd, arg1, arg2, arg3, arg4))
							printf("Error setting value: %s\n", req_error);
						else
							printf("Value of %s has been set to \"%s\"\n", arg3, arg4);
						print_rule();
					}
					else if (!strcmp(input, "7")) {
						attr_prompt2(revs[i], arg1, arg2, arg3, arg4);

						if (insert_attr_node(sockfd, arg1, arg2, arg3, arg4))
							printf("Error inserting attribute node: %s\n", req_error);
						else
							printf("Attribute node inserted successfully\n");
						print_rule();
					}
					else if (!strcmp(input, "8")) {
						attr_prompt1(revs[i], arg1, arg2, arg3);

						if (remove_attr_node(sockfd, arg1, arg2, arg3))
							printf("Error removing attribute node: %s\n", req_error);
						else
							printf("Attribute node removed successfully\n");
						print_rule();
					}
					else if (!strcmp(input, "9")) {
						subscribe_prompt(revs[i], arg1, arg2, &event, &capture);

						if (subscribe_event(sockfd, arg1, arg2, event, capture))
							printf("Error subscribing to event: %s\n", req_error);
						else
							printf("Successfully subscribed to event\n");
						print_rule();
					}
					else if (!strcmp(input, "10")) {
						subscribe_prompt(revs[i], arg1, arg2, &event, &capture);

						if (unsubscribe_event(sockfd, arg1, arg2, event, capture))
							printf("Error unsubscribing from event: %s\n", req_error);
						else
							printf("Successfully unsubscribed from event\n");
						print_rule();
					}
					else if (!strcmp(input, "11")) {
						service_prompt1(revs[i], arg1, arg2, arg3);

						if (add_service(sockfd, server_ID, arg1, arg2, arg3))
							printf("Error adding service: %s\n", req_error);
						else
							printf("Service \"%s\" added to %s\n", arg2, arg1);
						print_rule();
					}
					else if (!strcmp(input, "12")) {
						service_prompt2(revs[i], arg1, arg2);

						if (drop_service(sockfd, server_ID, arg1, arg2))
							printf("Error dropping service: %s\n", req_error);
						else
							printf("Service \"%s\" dropped from %s\n", arg2, arg1);
						print_rule();
					}
					else if (!strcmp(input, "13")) {
						service_prompt2(revs[i], arg1, arg2);

						if (locate_service(sockfd, server_ID, arg1, arg2))
							printf("Error requesting service: %s\n", req_error);
						else
							printf("Request has been sent\n");
						print_rule();
					}
					else if (!strcmp(input, "14") || !strcmp(input, "exit"))
						exit(0);
					else if (!strcmp(input, "clear"))
						system("clear");

					memset(input, 0, BUFFER_SIZE - 1);
					menu_prompt();
				}
				if (revs[i].data.fd == sockfd) {
					read(revs[i].data.fd, notification, BUFFER_SIZE);
					sscanf(notification, "{\"format\":%d,%*s", &format);
					if (format == 2)
						proc_notif(notification);
					else {
						perror("\nReceived unexpected reply");
						exit(0);
					}
				}
			} else if (revs[i].events & (EPOLLHUP | EPOLLERR))
				close(revs[i].data.fd);
		}
	}
	disconnect_server(sockfd);
	return 0;
}

void print_rule() {
	printf("==============================================================================\n");
}

void print_menu() {
	print_rule();
	printf("0 - Print Menu             5 - Get Attribute Value      10 - Unsubscribe Event\n");
	printf("1 - Get Element Value      6 - Set Attribute Value      11 - Add Service 	  \n");
	printf("2 - Set Element Value      7 - Insert Attribute Node    12 - Drop Service     \n");
	printf("3 - Insert Element Node    8 - Remove Attribute Node    13 - Locate Service   \n");
	printf("4 - Remove Element Node    9 - Subscribe Event          14 - Exit             \n");
	print_rule();
}

void menu_prompt() {
	printf("Enter an option: ");
	fflush(stdout);
}

void elem_prompt1(struct epoll_event rev, char *device_ID, char *element_ID) {

	printf("Enter the ID of the device: ");
	fflush(stdout);
	read(rev.data.fd, device_ID, 32);
	strchr(device_ID, '\n')[0] = '\0';

	printf("Enter the ID of the element: ");
	fflush(stdout);
	read(rev.data.fd, element_ID, 32);
	strchr(element_ID, '\n')[0] = '\0';
}

void elem_prompt2(struct epoll_event rev, char *device_ID, char *element_ID, char *value) {

	printf("Enter the ID of the device: ");
	fflush(stdout);
	read(rev.data.fd, device_ID, 32);
	strchr(device_ID, '\n')[0] = '\0';

	printf("Enter the ID of the element: ");
	fflush(stdout);
	read(rev.data.fd, element_ID, 32);
	strchr(element_ID, '\n')[0] = '\0';

	printf("Enter the new value: ");
	fflush(stdout);
	read(rev.data.fd, value, 32);
	strchr(value, '\n')[0] = '\0';
};

void elem_prompt3(struct epoll_event rev, char *device_ID, char *parent_ID, char *tag, char *element_ID, char *value) {
	printf("Enter the ID of the device: ");
	fflush(stdout);
	read(rev.data.fd, device_ID, 32);
	strchr(device_ID, '\n')[0] = '\0';

	printf("Enter the ID of the parent element: ");
	fflush(stdout);
	read(rev.data.fd, parent_ID, 32);
	strchr(parent_ID, '\n')[0] = '\0';

	printf("Enter the tag name: ");
	fflush(stdout);
	read(rev.data.fd, tag, 32);
	strchr(tag, '\n')[0] = '\0';

	printf("Enter the ID: ");
	fflush(stdout);
	read(rev.data.fd, element_ID, 32);
	strchr(element_ID, '\n')[0] = '\0';

	printf("Enter the value: ");
	fflush(stdout);
	read(rev.data.fd, value, 32);
	strchr(value, '\n')[0] = '\0';
};

void attr_prompt1(struct epoll_event rev, char *device_ID, char *element_ID, char *attr_name) {
	printf("Enter the ID of the device: ");
	fflush(stdout);
	read(rev.data.fd, device_ID, 32);
	strchr(device_ID, '\n')[0] = '\0';

	printf("Enter the ID of the element: ");
	fflush(stdout);
	read(rev.data.fd, element_ID, 32);
	strchr(element_ID, '\n')[0] = '\0';

	printf("Enter the name of the attribute: ");
	fflush(stdout);
	read(rev.data.fd, attr_name, 32);
	strchr(attr_name, '\n')[0] = '\0';
}

void attr_prompt2(struct epoll_event rev, char *device_ID, char *element_ID, char *attr_name, char *value) {
	printf("Enter the ID of the device: ");
	fflush(stdout);
	read(rev.data.fd, device_ID, 32);
	strchr(device_ID, '\n')[0] = '\0';

	printf("Enter the ID of the element: ");
	fflush(stdout);
	read(rev.data.fd, element_ID, 32);
	strchr(element_ID, '\n')[0] = '\0';

	printf("Enter the name of the attribute: ");
	fflush(stdout);
	read(rev.data.fd, attr_name, 32);
	strchr(attr_name, '\n')[0] = '\0';

	printf("Enter the value: ");
	fflush(stdout);
	read(rev.data.fd, value, 32);
	strchr(value, '\n')[0] = '\0';
}

void subscribe_prompt(struct epoll_event rev, char *device_ID, char *element_ID, int *event, int *capture) {
	char temp[32];

	printf("Enter the ID of the device: ");
	fflush(stdout);
	read(rev.data.fd, device_ID, 32);
	strchr(device_ID, '\n')[0] = '\0';

	printf("Enter the ID of the element: ");
	fflush(stdout);
	read(rev.data.fd, element_ID, 32);
	strchr(element_ID, '\n')[0] = '\0';

	print_rule();
	printf("0 - Subtree Modified          4 - Character Data Modified \n");
	printf("1 - Element Inserted          5 - Device Registered       \n");
	printf("2 - Element Removed           6 - Device Unregistered     \n");
	printf("3 - Attribute Modified                                    \n");
	print_rule();

	printf("Enter the event #: ");
	fflush(stdout);
	read(rev.data.fd, temp, 32);
	strchr(temp, '\n')[0] = '\0';
	sscanf(temp, "%d", event);

	printf("Enter capture mode: ");
	fflush(stdout);
	read(rev.data.fd, temp, 32);
	strchr(temp, '\n')[0] = '\0';
}

void service_prompt1(struct epoll_event rev, char *space, char *service, char *control_ID) {

	printf("Enter the ID of the space: ");
	fflush(stdout);
	read(rev.data.fd, space, 32);
	strchr(space, '\n')[0] = '\0';

	printf("Enter the name of the service: ");
	fflush(stdout);
	read(rev.data.fd, service, 32);
	strchr(service, '\n')[0] = '\0';

	printf("Enter the ID of the control state: ");
	fflush(stdout);
	read(rev.data.fd, control_ID, 32);
	strchr(control_ID, '\n')[0] = '\0';
}

void service_prompt2(struct epoll_event rev, char *space, char *service) {

	printf("Enter the ID of the space: ");
	fflush(stdout);
	read(rev.data.fd, space, 32);
	strchr(space, '\n')[0] = '\0';

	printf("Enter the name of the service: ");
	fflush(stdout);
	read(rev.data.fd, service, 32);
	strchr(service, '\n')[0] = '\0';
}

void proc_notif(char *notif) {
	int event, mod;
	char arg1[32], arg2[32], arg3[32], arg4[32], arg5[32];

	printf("\n");
	print_rule();
	printf("NOTIFICATION: ");
	sscanf(notif, "{\"format\":%*d,\"event\":%d,%*s", &event);

	if (event == ELEMENT_INSERTED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"deviceID\":\"%[^\"]\",\"parentID\":\"%[^\"]\",\"tag\":\"%[^\"]\",\"elementID\":\"%[^\"]\",\"value\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3,
			arg4,
			arg5
		);
		printf("Element Inserted\n");
		printf("device ID : %s\n", arg1);
		printf("parent ID : %s\n", arg2);
		printf("element tag: %s\n", arg3);
		printf("element ID: %s\n", arg4);
		printf("value: %s\n", arg5);
	}
	else if (event == ELEMENT_REMOVED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"deviceID\":\"%[^\"]\",\"parentID\":\"%[^\"]\",\"tag\":\"%[^\"]\",\"elementID\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3,
			arg4
		);
		printf("Element Removed\n");
		printf("device ID : %s\n", arg1);
		printf("parent ID : %s\n", arg2);
		printf("element tag: %s\n", arg3);
		printf("element ID: %s\n", arg4);
	}
	else if (event == ATTR_MODIFIED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"deviceID\":\"%[^\"]\",\"elementID\":\"%[^\"]\",\"attr\":\"%[^\"]\",\"change\":\"%d\",\"prevValue\":\"%[^\"]\",\"newValue\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3,
			&mod,
			arg4,
			arg5
		);
		printf("Attribute Modified\n");
		printf("device ID: %s\n", arg1);
		printf("element ID: %s\n", arg2);
		printf("attribute: %s\n", arg3);
		printf("modification: %d\n", mod);
		printf("previous value: %s\n", arg4);
		printf("new value: %s\n", arg5);
	}
	else if (event == CHARACTER_DATA_MODIFIED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"deviceID\":\"%[^\"]\",\"tag\":\"%[^\"]\",\"elementID\":\"%[^\"]\",\"prevValue\":\"%[^\"]\",\"newValue\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3,
			arg4,
			arg5
		);
		printf("Element Value Updated\n");
		printf("device ID : %s\n", arg1);
		printf("element ID : %s\n", arg3);
		printf("element tag: %s\n", arg2);
		printf("previous value: %s\n", arg4);
		printf("new value: %s\n", arg5);
	}
	else if (event == SERVICE_LOCATED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"service\":\"%[^\"]\",\"deviceID\":\"%[^\"]\",\"controlID\":\"%[^\"]\",\"location\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3,
			arg4
		);
		printf("Service Located\n");
		printf("service : %s\n", arg1);
		printf("location: %s\n", arg4);
		printf("device ID: %s\n", arg2);
		printf("control ID: %s\n", arg3);

	}
	else if (event == DEVICE_REGISTERED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"deviceID\":\"%[^\"]\",\"deviceType\":\"%[^\"]\",\"location\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3
		);
		printf("Device Registered\n");
		printf("device ID: %s\n", arg1);
		printf("device type: %s\n", arg2);
		printf("location: %s\n", arg3);
	}
	else if (event == DEVICE_UNREGISTERED) {
		sscanf(
			notif,
			"{\"format\":%*d,\"event\":%*d,\"deviceID\":\"%[^\"]\",\"deviceType\":\"%[^\"]\",\"location\":\"%[^\"]\"}",
			arg1,
			arg2,
			arg3
		);
		printf("Device Unregistered\n");
		printf("device ID: %s\n", arg1);
		printf("device type: %s\n", arg2);
		printf("location: %s\n", arg3);
	}
	else
		printf("%s\n", notif);
	print_rule();
	menu_prompt();
}

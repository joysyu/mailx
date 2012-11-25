from django.http import *
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
import engine.main
from engine.msg_codes import *

'''
@author: Anant Bhardwaj
@date: Nov 9, 2012

MailX Web Interface Handler
'''
request_error = {'code': msg_code['REQUEST_ERROR'],'status':False}

def index(request):
	return render_to_response("index.html")
	


def list_groups(request):
	try:
		res = engine.main.list_groups()
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")



def create_group(request):
	try:
		res = engine.main.create_group(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")




def activate_group(request):
	try:
		res = engine.main.activate_group(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")




def deactivate_group(request):
	try:
		res = engine.main.deactivate_group(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")




def subscribe_group(request):
	try:
		res = engine.main.subscribe_group(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")
	



def unsubscribe_group(request):
	try:
		res = engine.main.unsubscribe_group(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")



def group_info(request):
	try:
		res = engine.main.group_info(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")




def insert_post(request):
	try:
		res = engine.main.insert_post(request.POST['group_name'], request.POST['message'], request.POST['poster_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")
	


def insert_reply(request):
	try:
		res = engine.main.insert_reply(request.POST['group_name'], request.POST['message'], request.POST['poster_email'], request.POST['post_id'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")
	


def follow_post(request):
	try:
		res = engine.main.follow_post(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")



def unfollow_post(request):
	try:
		res = engine.main.unfollow_post(request.POST['group_name'], request.POST['requester_email'])
	    return HttpResponse(res, mimetype="application/json")
	except:
		return HttpResponse(request_error, mimetype="application/json")



	
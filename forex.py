import sys
import pandas
import pickle
import os
import functools

def main(origin, interval):
	if(origin[-1] != "/"): origin += "/"
	current_path = os.path.realpath(__file__)[:-8]
	target_path = current_path + origin

	excludedNames = [".DS_Store"]
	folders = getFolders(target_path, excludedNames)

	processed_number = 0
	number_of_files = functools.reduce(lambda len1, len2: len1 + len2, map(lambda folder: len(folder.files), folders), 0)
	for folder in folders:
		origin = folder.getOriginString();
		destination = folder.getDestString(interval + 'min');
		folder.createIfNotExists(destination);
		filenames = folder.files
		for filename in filenames:
			aggregateFile(filename, origin, destination, interval)
			processed_number += 1
			print("Finished file ", processed_number, " of ", number_of_files)

def getFolders(path, excludedNames):
	folders = []
	for root, subFolders, files in os.walk(path):
		if len(subFolders) != 0: continue
		files = list(filter(lambda x: x not in excludedNames, files))
		if len(files) == 0: continue

		root = root.split('/');
		month = root[-1]
		year = root[-2]
		currency = root[-3]
		folder = root[-4]
		root = '/'.join(root[:-4])
		folders.append(Folder(root, folder, currency, year, month, files))
	return folders

def aggregateFile(filename, origin, dest, interval, limit_rows = None):
	df = pandas.read_csv(origin + filename, parse_dates=True, index_col=3, date_parser=parse, nrows=limit_rows)

	del df['lTid']
	del df['cDealable']
	del df['CurrencyPair']

	# group every 15 minutes and create OHLC
	grouped_data = df.resample(interval + 'Min').ohlc()
	#grouped_data = df.resample('24H', how='ohlc')

	# save to file
	grouped_data.to_pickle(dest + filename + '-OHLC.pkl')

def parse(timestamps):
	clean = timestamps.split(".")[0] if '.' in timestamps else timestamps
	return pandas.datetime.strptime(clean,"%Y-%m-%d %H:%M:%S")

def readPkl(filename):
	pkl_file = open(filename, 'rb')
	return pickle.load(pkl_file)

class Folder:
	def __init__(self, root, folder, currency, year, month, files):
		self.root = root if root[-1] == '/' else root + '/'
		self.folder = folder
		self.currency = currency
		self.year = year
		self.month = month
		self.files = files

	def getOriginString(self):
		return self.root + self.folder + '/' + self.currency + '/' + self.year + '/' + self.month + '/'

	def getDestString(self, dest):
		return self.root + dest + '/' + self.currency + '/' + self.year + '/' + self.month + '/'

	def createIfNotExists(self, dest):
		if(not os.path.exists(dest)):
			os.makedirs(dest)

if __name__ == "__main__":
	main(sys.argv[1], sys.argv[2])
